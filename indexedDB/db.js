class DB {
    constructor() {
        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        this.req = indexedDB.open("20220212db3",4);

        this.db = ""

        this.req.onerror = (ev) => {
            console.log("DB 오픈 실패");
        }

        this.req.onupgradeneeded = (ev) => {
            console.log("DB 최초 생성");
            db = ev.target.result; // IDBDatabase 객체

            const stores = ["users"];
            console.log(stores);
            stores.forEach(storeName => {

                // 기존 객체 저장소가 존재할 경우
                if (db.objectStoreNames.contains("user")) {
                    // 기존 객체 저장소 삭제
                    db.deleteObjectStore("users");
                }

                // 객체 저장소 생성
                db.createObjectStore("users", {
                    keyPath: "idx",
                    autoIncrement: true
                })

            })
        }

        

    }



    select() {
        this.req.onsuccess = (ev) => {
            console.log("DB 성공");
            this.db = ev.target.result

            this.transaction = this.db.transaction("users", "readwrite")
            this.objectStore = this.transaction.objectStore("users");

            const req = this.objectStore.getAll()
            req.onsuccess = function() {
                let item = req.result
                console.log(item);
            }
        }

    }

    insert(name, age) {
        this.req.onsuccess = (ev) => {
            console.log("DB 성공");
            this.db = ev.target.result

            this.transaction = this.db.transaction("users", "readwrite")
            this.objectStore = this.transaction.objectStore("users");

            objectStore.add({
                name : name,
                age : age,
            });
            console.log("test");
        }
    }

}