const request = indexedDB.open("notes", 2);
// IndexedDB.open(Name, Version)

var db = ""

request.onupgradeneeded = e => {
    db = e.target.result;

	var objectStore = db.createObjectStore("memo", { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
}

request.onsuccess = e => {
    // alert("success is called");
}

request.error = e => {
    alert("error is called");
}

const memos = [
	{ id: 1, name: "Lee", age: 12, text:"I don't want to go to school."},
	{ id: 2, name: "Kim", age: 25, text:"I don't want to go to work." }
];

var memoObjectStore = db.transaction("memo", "readwrite").objectStore("memo");
memos.forEach(function(memo) {
	memoObjectStore.add(memo);
});

var memoObjectStore2 = db.transaction("memo").objectStore("memo");
var request2 = memoObjectStore2.get("1");

request2.onsuccess = e => {
    console.log(request2.result.name);
}