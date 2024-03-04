// insert css
const css = `
    .button_injected_by_masaldev {
        border-radius: 5px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 4px;
        background-color: #35374B;
        color: white;
        opacity: 0.5;
        cursor: pointer;
    }
    .button_injected_by_masaldev:active {
        background-color: white;
        color: #35374B;
    }
    .button_injected_by_masaldev:hover {
        opacity: 1;
    }
    .item-copied {
        font-size: 12px;
        opacity: 1;
    }
    .display-none {
        display: none;
    }
`;

var svg = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 2h7v4h4v10h-3v1h4V4.6L17.4 1H8v5h1zm8 0h.31L20 4.69V5h-3zM5 19h7v1H5zm-2 4h13V10.6L12.4 7H3zm9-15h.31L15 10.69V11h-3zM4 8h7v4h4v10H4zm1 5h9v1H5zm4 3h5v1H5v-1z" fill="currentColor"><path  d="M0 0h24v24H0z"/></svg>'

window.onload = function(){
    var newStyle = document.createElement('style');
    newStyle.innerHTML = css;
    document.head.appendChild(newStyle);
}

function insertBtnToTables(){
    var tables = document.querySelectorAll('table');
    var copyBtn = document.createElement('div');
    copyBtn.classList.add('button_injected_by_masaldev')
    copyBtn.innerHTML = svg;
    
    tables.forEach(function(table){
        table.style.position = 'relative';
        table.insertBefore(copyBtn.cloneNode(true), table.firstChild);
    });
    
    copyToClipboard();
}

function removeBtn(){
    var myButtons = document.querySelectorAll('.button_injected_by_masaldev');
    var myButtonsArray = Array.from(myButtons)
    myButtonsArray.forEach(function(button){
        button.remove();
    });
}

// declare function to replace <br> with " - "
const replaceBrWithSpaces = (div) => {
    const brElements = div.querySelectorAll("br");
    for (const brElement of brElements) {
      brElement.parentNode.replaceChild(document.createTextNode(" - "), brElement);
    }
};

function copyToClipboard(){
    var tables = document.querySelectorAll('table')
    var myButtons = document.querySelectorAll('.button_injected_by_masaldev');
    myButtons.forEach(function(button,index){
        button.addEventListener('click',function(){
            // Get the corresponding content element
            var contentToCopy = tables[index];

            // Create a range and select the content
            var range = document.createRange();
            range.selectNode(contentToCopy);
            
            // Create a selection and select the range
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            replaceBrWithSpaces(tables[index])
            
            // Execute the copy command
            document.execCommand('copy');
            
            // Deselect the content
            selection.removeAllRanges();
            console.log('table copied.')

            // change copybutton to text "copied!" when it's done.
            button.innerHTML = '<span>&#10003; Copied!</span>';
            button.classList.add('item-copied')
            setTimeout(function() {
                button.innerHTML = svg;
                button.classList.remove('item-copied');
            }, 1000);
        })
    })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
      // Access DOM elements or perform actions based on the enabled state:
      if (request.enabled) {
        // Do something when the extension is enabled
        console.log("Ekstensi aktif.");
        insertBtnToTables();

    } else {
        // Do something when the extension is disabled
        console.log("Ekstensi tidak aktif.");
        removeBtn()
      }
    }
});
  
