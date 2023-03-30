 // window.indexedDB // 익스플로러, 크롬
        // window.webkitIndexedDB // 사파리, 웨일
        // window.mozIndexedDB // 파이어폭스
        // window.msIndexedDB // 엣지

        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

        const req = indexedDB.open("20220212db3",4);
        let db;

        req.onsuccess = (ev) => {
            console.log("DB 오픈 성공");
            db = ev.target.result;

            //  users 객체 저장소에 접근을 하겠다.
            //  읽고 쓸 수 있는 권한으로
            const transaction = db.transaction("users", "readwrite")
            const objectStore = transaction.objectStore("users");

            // 데이터 추가

            // objectStore.add({
            //     name : "홍길동4",
            //     age : 20,
            //     test : 12
            // });

            // 데이터 삭제
            // objectStore.delete(2);

            // 데이터 수정
            // objectStore.put({
            //     idx : 3,
            //     name : "아아아",
            //     age : 100
            // })

            // 데이터 조회
            // const req = objectStore.get(3);
            // req.onsuccess = function() {
            //     console.log(req.result);
            // }

            // 모든 데이터 조회 1
            const req = objectStore.getAll();
            req.onsuccess = function() {
                let item = req.result
                console.log(item);
                console.log(item.filter(x=>x.test==12));
            }

            // 모든 데이터 조회 2
            // const cur = objectStore.openCursor();
            // cur.onsuccess = (ev) => {
            //     const cursor = ev.target.result;

            //     if(cursor) {
            //         cursor.value; // 현재 값
            //         console.log(cursor.value);
            //         cursor.continue(); // 다음 데이터로 이동
            //     }
            // }


        }

        req.onerror = (ev) => {
            console.log("DB 오픈 실패");
        }

        req.onupgradeneeded = (ev) => {
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