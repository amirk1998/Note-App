export default class NotesView {
  //
  constructor(root) {
    this.root = root;

    this.root.innerHTML = `
    <div class="notes-sidebar z-10 h-screen w-64 sticky top-0 right-0 flex flex-col bg-gradaient-to-b from-slate-600 via-slate-700 to-slate-800 transition-all duration-300 ease-out pt-6 px-3 pb-[0.2rem] rounded-tl-[100px]">
        <div class="notes-logo uppercase text-5xl tracking-[0.2rem] font-extrabold border-b-[1px] border-solid border-white border-opacity-20 py-8 px-0 text-center text-white">NOTE APP</div>
        <div class="notes-list flex-grow my-4 overflow-auto scrollbar-hide">
         ITEMS
        </div>
        <button class="add-notes bg-emerald-600 hover:bg-emerald-500 border-none rounded-lg text-violet-100 cursor-pointer text-xl font-bold mb-4 py-3 px-0 w-full transition-all duration-300 ease-in-out" aria-label="add-notes">Add Note</button>
      </div>
      <div class="notes-preview flex flex-col py-8 px-12 flex-grow">
        <input type="text" name="notes-title" id="notes-title" class="notes-title border-none outline-none w-full rounded-2xl py-4 px-6 font-bold text-5xl" aria-label="notes-title" placeholder="Note Title ... " />
        <textarea name="notes-body" id="notes-body" class="notes-body border-none outline-none w-full rounded-2xl py-4 px-6 flex-grow text-xl leading-6 mt-8 resize-none" aria-label="notes-body" placeholder="Take some notes ..."></textarea>
      </div>
    
    
    
    `;
  }
}
