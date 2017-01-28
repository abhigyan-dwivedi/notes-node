console.log("Starting notes.js")

const fs=require('fs')


var fetchNotes=()=>{
  try{
    notesString=fs.readFileSync('notes-data.json')
    return JSON.parse(notesString);
  }catch (e){
    return []
  }
};
var saveNotes=(notes)=>{
  fs.writeFileSync("notes-data.json",JSON.stringify(notes));
};



////////////Refactoring code
var addNote=(title,body)=>{
//console.log("Adding Note",title,body);

var notes=fetchNotes();
var note={
  title,
  body
};

var duplicateNotes=notes.filter((note)=>{
  return note.title===title;
});

if(duplicateNotes.length===0){
  notes.push(note);
  saveNotes(notes);
  return note;
}
};

var getAll=()=>{
    console.log("Getting all notes!!")
    console.log(fetchNotes())
}

var getNote=(title)=>{
  console.log("Reading note: ",title)
  var notes=fetchNotes();
  var filteredNotes=notes.filter((note)=>note.title===title);
  console.log("Filtered Note:",filteredNotes)
  return filteredNotes[0]
}

var removeNote=(title)=>{
  var notes=fetchNotes();
  var noteToBeRemoved;
  var filteredNotes=notes.filter((note)=>{
    if(note.title===title){
      noteToBeRemoved=note
    }
    return note.title!==title
  });

  console.log("Removed Note:");
  logNote(noteToBeRemoved);

  saveNotes(filteredNotes)

  return notes.length!=filteredNotes.length;
}

var logNote=(note)=>{
  console.log("============================");
  console.log(`Title:${note.title}`);
  console.log(`Body:${note.body}`);
  console.log("============================");
};

module.exports={
//  addNote:addNote identical to addNote
addNote,
getAll,
getNote,
removeNote,
logNote
}
