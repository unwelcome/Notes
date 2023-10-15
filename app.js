const checkList = [
    {
        title: 'Some text here',
        dataIndex: 0,
        completed: false
    },
    {
        title: 'Another text here',
        dataIndex: 1,
        completed: false
    }
]
const checklistBody = document.getElementById('checklist_body')
const addBtn = document.getElementById('checklist_submit')
const addInput = document.getElementById('checklist_input')

function render(){
    checklistBody.innerHTML = ''
    for (let note of checkList){
        checklistBody.insertAdjacentHTML('beforeend', getNodeTemplate(note))
    }
}
function getNodeTemplate(note){
    return `
        <li class="checklist_item">
            <p${note.completed ? ' class="text_done"' : ''}>${note.title}</p>
            <button class="btn btn_done"  data-index="${note.dataIndex}" data-type="toggle">&check;</button>
            <button class="btn btn_delete"  data-index="${note.dataIndex}" data-type="remove">&times;</button>
        </li>`
}
render()

addBtn.addEventListener('click', function() {
    if(addInput.value.length === 0){return }
    const newNote = {
        title: addInput.value,
        dataIndex: checkList.length > 0 ? checkList[checkList.length-1].dataIndex+1 : 0,
        completed: false
    }
    if(!isNoteConsistInChecklist(newNote.title)){
        checkList.push(newNote)
        render()
    }
    addInput.value = ''
})
function isNoteConsistInChecklist(title){
    for(note of checkList){
        if (note.title === title){return true}
    }
    return false
}

checklistBody.addEventListener('click', function(event) {
    if(!event.target.dataset.index){return }
    if(event.target.dataset.type === 'remove'){
        checkList.splice(getIndexOfNote(event.target.dataset.index), 1)
        render()
    }
    else if (event.target.dataset.type === 'toggle'){
        checkList[event.target.dataset.index].completed = true
        render()
    }
})
function getIndexOfNote(dataindex){
    for(let i = 0; i < checkList.length;i++){
        if(checkList[i].dataIndex == dataindex){return i}
    }
    return -1
}
