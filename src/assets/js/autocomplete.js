    
var $ 
var someListFromServer = localStorage.getItem('userNameList') ?JSON.parse(localStorage.getItem('userNameList')):[] // ['hello', 'hello, world!', 'test', 'tt', 'tt @tt', 'abc<d', 'name', 'some name', 'another name', 'holla', 'position', 'gender', 'age', 'date', '@#$%#^$%&$%&$%%*^(*)', '!@#%#$%#$<><<[]()', '±§∆˙ß∂©ƒˆ¨¨™£'];
    // localStorage.getItem('userList')

    /**
     *
     * @param element
     * @returns {number}
     */
    function getCaretPosition(element) {
        let position = 0;
        if ( window.getSelection ) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                position = preCaretRange.toString().length;
            }
        }
        return position;
    }
    
    /**
     *
     * @returns {Document|(Node & ParentNode)}
     */
    function getElementOfCurrentCaret() {
        if ( window.getSelection ) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                return (range.startContainer === range.endContainer ? range.startContainer : range.commonAncestorContainer).parentNode;
            }
        }
        return document;
    }
    
    /**
     *
     * @param element
     * @param position
     */
    function setCaretPosition(element, position) {
        const range = document.createRange();
        const selection = window.getSelection();
    
        //select appropriate node
        let currentNode = null;
        let previousNode = null;
    
        for (let i = 0; i < element.childNodes.length; i++) {
            //save previous node
            previousNode = currentNode;
    
            //get current node
            currentNode = element.childNodes[i];
            //if we get span or something else then we should get child node
            while (currentNode.childNodes.length > 0) {
                currentNode = currentNode.childNodes[0];
            }
    
            //calc offset in current node
            if (previousNode != null) {
                position -= previousNode.length;
            }
            //check whether current node has enough length
            if (position <= currentNode.length) {
                break;
            }
        }
        //move caret to specified offset
        if (currentNode != null) {
            range.setStart(currentNode, position);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    /**
     *
     * @param text
     * @returns {*}
     */
    function escapeHTML(text) {
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\s/g, '&nbsp;');
    }
    
    /**
     *
     * @param caretOffset
     */
      function processInput(caretOffset = 0) {
        const position = getCaretPosition(jInput[0]);
        let text = jInput.text();
        text = escapeHTML(text);
        text = replaceMentions(text, mentionList);
        jInput.html($.parseHTML(text));
        setCaretPosition(jInput[0], position + caretOffset);
    }
    
    /**
     *
     * @param text
     * @param list
     * @returns {*}
     */
    function replaceMentions(text, list) {
        let newText = text.replace(/\s/g, '&nbsp;'); // replace all space-like characters into spaces
        const sortedList = [...mentionList].sort((a, b) => b.length - a.length);
        list && sortedList.forEach((name, index) => newText = newText.replaceAll(`@${name}`, `<<${index}>>`));
        newText = newText.replace(/@\w*/g, `<div class="mention ignore">$&</div>`)
        return newText.replace(/<<(\d+)>>/g, (...{ 1: index }) => `<div class="mention">@${sortedList[index]}</div>`);
    }
    
    /**
     *
     * @param searchPhrase
     */
    function rebuildSelectionBox(searchPhrase = "") {
        let filtered = mentionList.filter(name => name.includes(searchPhrase));
        if ( !filtered.length ) filtered = mentionList;
        jChoices.empty().append(
            $('<ul />').append(
                filtered.map(name => `<li>${name}</li>`).join('')
            )
        );
        $('li', jChoices).on('mouseenter', function(){
            $(this).addClass('hover');
        }).on('mouseout', function() {
            $(this).removeClass('hover');
        })
    }
    
    /**
     *
     * @param e
     */
    function handleChoicesControlKeys(e) {
        if ( e.keyCode === KEY_ESC ) {
            hideSelectionChoices();
            e.preventDefault();
        }
    }
    
    /**
     *
     * @param jScrollElement
     * @param jVisibleElement
     */
    function fixScrollY(jScrollElement, jVisibleElement) {
        const scrollableHeight = jScrollElement.innerHeight();
        const scrollableTop = jScrollElement.scrollTop();
        const visibleHeight = jVisibleElement.innerHeight();
        const visibleTop = jVisibleElement.position().top;
        if ( visibleHeight + visibleTop > scrollableHeight ) {
            jScrollElement.scrollTop(scrollableTop + visibleHeight + visibleTop - scrollableHeight);
        } else if ( visibleTop < 0 ) {
            jScrollElement.scrollTop(scrollableTop + visibleTop);
        }
        console.log({scrollableHeight, scrollableTop, visibleHeight, visibleTop});
    }
    
    /**
     *
     * @param e
     * @returns {boolean}
     */
    function handleChoicesArrowKeys(e) {
        const jSelected = $('li.hover', jChoices);
        if ( [KEY_UP, KEY_DOWN].includes(e.keyCode) ) {
            const action = {
                [KEY_UP]: {limit: ':first-child', move: 'prev'},
                [KEY_DOWN]: {limit: ':last-child', move: 'next'},
            }, code = e.keyCode;
            if ( jSelected.length ) {
                jSelected.first().is(action[code].limit) || jSelected.removeClass('hover').first()[action[code].move]().addClass('hover');
            } else {
                $('li:first-child', jChoices).addClass('hover');
            }
            fixScrollY(jChoices, $('li.hover', jChoices).first());
            return true;
        } else if ( e.keyCode === KEY_ENTER ) {
            if ( jSelected.length ) {
                replaceFocusedMention(jSelected.html());
                hideSelectionChoices();
                e.preventDefault();
            }
            return true;
        }
        return false
    }
    
    /**
     *
     * @param contextElement
     */
    function showSelectionChoices(contextElement) {
        const { top: eTop, left: eLeft } = $(contextElement).offset();
        const { top: wTop, left: wLeft } = jWrapper.offset();
        console.log({eTop, eLeft, wTop, wLeft});
        jChoices
            .css({ top: eTop - wTop, left: eLeft - wLeft })
            .removeClass('hidden')
            .scrollTop(0);
        $('li', jChoices).on('click',function(){
            replaceFocusedMention($(this).html());
            hideSelectionChoices();
        });
        $(document).on('keyup', handleChoicesControlKeys);
        $('li:first', jChoices).addClass('hover').siblings('.hover').removeClass('hover');
    }
    
    /**
     *
     */
    function hideSelectionChoices() {
        jChoices.addClass('hidden');
        $(document).off('keyup', handleChoicesControlKeys);
        $('li.hover', jChoices).removeClass('hover');
    }
    
    /**
     *
     * @param element
     * @param isFilterChoices
     */
    function handleFocusedElement(element, isFilterChoices = true) {
        if (element && $(element).hasClass('mention')) {
            $(element).addClass('focused');
            rebuildSelectionBox(isFilterChoices ? $(element).html().substr(1) : "");
            showSelectionChoices(element);
        } else {
            hideSelectionChoices();
        }
        $('.mention').not(element).removeClass('focused');
    }
    
    /**
     *
     * @param mentionName
     */
    function replaceFocusedMention(mentionName) {
        $('.mention.focused').html('@' + mentionName);
        processInput($('<p>').html(mentionName).text().length + 1);
    }
    
    // -------------------
    
   
    //trigger event

        var KEY_ESC = 27, KEY_ENTER = 13, KEY_DOWN = 40, KEY_UP = 38;
    
        var mentionList = [...someListFromServer].map(escapeHTML);
        
        var jWrapper = $('#wrapper');
        var jInput = $('#input-box').on('input', () => processInput());
        var jChoices = $('#mention-select-choices').on('mousedown', e => e.preventDefault());
        
        
        jInput.on('keydown', e => e.keyCode !== KEY_ENTER )
        
        jInput.on('mouseup keyup', e => {
            if ( e.type === 'mouseup' || !handleChoicesArrowKeys(e) ) {
                const element = getElementOfCurrentCaret();
                handleFocusedElement(element, e.type !== 'mouseup');
            }
        });
        
        jInput.on('blur', function(e) {
            handleFocusedElement();
        });
        
        //content should be updated manually to prevent aditional spaces
        jInput.html('');
        processInput();
     
    
   
 
    
 