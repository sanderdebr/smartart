import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(settings) {
        this.settings = settings;
    }

    randomize(data, limit) {
        let result = [];
        let numbers = [];
        for (let i = 0; i < limit; i++) {
            const random = Math.floor(Math.random() * data.length);
            if (numbers.indexOf(random) === -1) {
                numbers.push(random);
                result.push(data[random]);
            }
        }
        return result;
    }

    filterByCentury(results) {   
        const century = this.settings.century.toString();
        const filtered = results.filter(result => result.century == century);
        const result = this.randomize(filtered, 5);
        return result;
    }

    async getPaintings() {
        try {
            this.classification = this.settings.classification.toString();
            const res = await axios(`https://api.harvardartmuseums.org/object?apikey=${key}&classification=${this.classification}&size=100`);
            this.result = this.filterByCentury(res.data.records);
        } catch (error) {
            alert(error);
        }
    }
}
