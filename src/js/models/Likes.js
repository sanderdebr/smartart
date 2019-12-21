export default class Likes {
    constructor() {
        this.likes = [];
    }

    storeData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }

    addLike(objectnumber, division) {
        const obj = {
            object: objectnumber,
            division: division
        }
        this.likes.push(obj);

        // Store data in local storage
        this.storeData();

        return obj;
    }

    removeLike(objectnumber) {
        const index = this.likes.findIndex(likes => likes.object === objectnumber);
        
        // Store data in local storage
        this.storeData();

        this.likes.splice(index, 1);
    }

}