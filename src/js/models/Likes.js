export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(objectnumber, division) {
        const obj = {
            object: objectnumber,
            division: division
        }
        this.likes.push(obj);
        return obj;
    }

    removeLike(objectnumber) {
        const index = this.likes.findIndex(likes => likes.object === objectnumber);
        this.likes.splice(index, 1);
    }

}