

let noteRootElement = document.querySelector('.noteList');

let notes = [];

function renderElementsToScreen(){

    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'));
       if(Array.isArray(notes)){
        notes.forEach(note=>{
            renderNoteToList(note, note.uniqueId)
        })
       }
        
    }
}

document.querySelector('#deleteAllNotes').addEventListener('click', () =>{
    document.querySelectorAll('.note').forEach(value =>{
        value.remove()
    })
    localStorage.clear()
})

document.querySelector('#createNoteButton').addEventListener('click',()=>{
    let uniqueId = 'note'+ Math.floor(Math.random()*1000);
    let titleData = document.querySelector('#createNoteTitle').value
    let contentData = document.querySelector('#createNoteContent').value
    if (titleData === '' || contentData === ''){
        alert('Please Fill the Title and content')
    }else{
        let note ={
            title : document.querySelector('#createNoteTitle').value,
            content : document.querySelector('#createNoteContent').value
        }       
        addNoteToLocalStrorage(note,uniqueId)
        renderNoteToList(note, uniqueId)     
    }
})

function renderNoteToList(note,uniqueId){

    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note',uniqueId)
    let noteTitle = document.createElement('h4');
    let noteContent = document.createElement('textarea');
    let noteButton = document.createElement('button')
    let noteEditButton = document.createElement('button');
    noteEditButton.className = 'editButton';

    noteTitle.innerHTML = note.title;
    noteContent.innerHTML = note.content;
    noteButton.innerHTML = 'Delete Note'
    noteEditButton.innerHTML ='Edit Note'

    noteButton.addEventListener('click',()=>{
        // noteButton.parentElement.remove()
        removeElementFromNoteList(uniqueId);       
    })

    noteEditButton.addEventListener('click',()=>{
        editedElementFromNoteList(uniqueId)
    })
    
    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(noteContent);
    noteDiv.appendChild(noteButton);
    noteDiv.appendChild(noteEditButton)

    noteRootElement.appendChild(noteDiv)

    document.querySelector('#createNoteTitle').value = ''
    document.querySelector('#createNoteContent').value =''

}

function addNoteToLocalStrorage(note, uniqueId){
    note = {...note, uniqueId};

    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))
}

function editedElementFromNoteList(id){
    console.log(id)
    let element = document.querySelector('.'+id)
        
}

function removeElementFromNoteList(id){
    console.log(id)

    document.querySelector('.'+id).remove()

    notes = JSON.parse(localStorage.getItem('notes')) 

    let index = notes.findIndex(note=> note.uniqueId == id)

    notes.splice(index, 1)

    localStorage.setItem('notes', JSON.stringify(notes));
}
    


renderElementsToScreen();
