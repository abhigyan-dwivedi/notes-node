console.log("Starting app");

const fs = require('fs');
const _  = require('lodash');
const yargs=require('yargs');


const notes=require('./notes.js');

const titleOptions={
  describe:'Title of note',
  demand:true,
  alias:'t'
}

const bodyOptions={
  describe:'Body of note',
  demand:true,
  alias:'b'
}

//const argv=yargs.argv;
const argv=yargs
.command('add','Add a new note',{
  title:titleOptions,
  body:bodyOptions
})
.command('list','List all the notes')
.command('read','Read the note',{
  title:titleOptions
})
.command('remove','Remove the note',{
  title:titleOptions
})
.help().argv;


var command=argv._[0];

console.log('Yargs:',argv);
console.log("Command:",command)

if (command==='add'){
  var note=notes.addNote(argv.title,argv.body);
  if (note===undefined){
  console.log('Note title taken');
    }else{
  notes.logNote(note);
}
}else if (command==='list'){
  console.log('Listing all notes');
  notes.getAll()

}else if (command==='read'){
  console.log('Fetching note');
  var note=notes.getNote(argv.title);
  if(note===undefined){
    console.log('Note not found')
  }else{
  console.log("Read Note:");
  notes.logNote(note);
  }
}else if (command==='remove'){
  console.log('Removing note');
  var noteRemoved=notes.removeNote(argv.title);
  var message=(noteRemoved)?"Note was Removed.":"Note not found."
  console.log(message);

}else {
  console.log('Command not recoganized');
}
