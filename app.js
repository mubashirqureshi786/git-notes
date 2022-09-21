const addbutton = document.querySelector("#add");

addbutton.addEventListener("click", () => newNote());
const newNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
    <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>

</div>
<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>
    `;
  note.insertAdjacentHTML("afterbegin", htmlData);
  // console.log(note)

  // getting references

  const editbutton = note.querySelector(".edit");
  const delbutton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // deleting the note

  delbutton.addEventListener("click", () => {
    note.remove();
  });

  textArea.value = text;
  mainDiv.innerHTML = text;

  // toggle using button
  editbutton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (e) => {
    const value = e.target.value;
    mainDiv.innerHTML = value;

    updateLSdata();
  });

  document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => newNote(note));
}

const updateLSdata = () => {
  const textareaData = document.querySelectorAll("textarea");
  const notes = [];

  textareaData.forEach((note) => {
    return notes.push(note.value);
  });

  // local storage

  localStorage.setItem("notes", JSON.stringify(notes));
};
