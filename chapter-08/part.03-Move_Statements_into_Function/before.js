function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  // result.push(renderPhoto(person.photo));
  result.push(`<p>title: ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join('\n');
}

function photoDiv(p) {
  return ['<div>', `<p>title: ${p.title}</p>`, emitPhotoData(p), '</div>'].join('\n');
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
  return result.join('\n');
}

const date = new Date('May 10, 2019');

const aPerson = {
  name: 'Alex',
  photo: {
    title: 'holiday',
    location: 'Greece',
    date: date,
  },
};

console.log(renderPerson([], aPerson));

module.exports = {
  renderPerson,
  photoDiv,
};
