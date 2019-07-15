var _ = require('lodash')
const Json2csvParser = require('json2csv').Parser;

class ParkingManager {
    constructor() {
        this.parkingLot = [];
    }
    create(numberOfSlots) {
        if (!numberOfSlots || !parseInt(numberOfSlots) || parseInt(numberOfSlots) <= 0) {
            console.log('ERROR: create_parking_lot: specify the number of slots. It must be a greater than 0');
            throw new Error('ERROR: status: invalid input ');
        } else if (this.parkingLot.length) {
            console.log('ERROR: create_parking_lot: There is already a parking lot active. Please restart');
        } else {
            var numberOfSlots = parseInt(numberOfSlots);
            this.parkingLot = (new Array(numberOfSlots)).fill(undefined).map((_, i) => { return { id: i + 1, isOccupied: false } });
            console.log('created a parking lot with ' + this.parkingLot.length + ' slots');
        };
        return this.parkingLot;
    }
    park(regNum, color) {
        var remainingSlots = this.parkingLot.filter(x => !x.isOccupied);
        if (!regNum || !color) {
            console.log('ERROR: park: invalid input ');
        } else if (remainingSlots.length == 0) {
            console.log('Sorry, parking lot is full');
        } else {
            this.parkingLot[remainingSlots[0].id - 1].registrationNumber = regNum;
            this.parkingLot[remainingSlots[0].id - 1].color = color;
            this.parkingLot[remainingSlots[0].id - 1].isOccupied = true;
            this.parkingLot[remainingSlots[0].id - 1].inTime = new Date();
            console.log('Allocated slot number: ' + remainingSlots[0].id + ' for vehicle registration number: ' + regNum);
        }
        return this.parkingLot;
    }
    leave(slotNumber) {
        if (!slotNumber || !parseInt(slotNumber)) {
            console.log('ERROR: leave: invalid input ');
        } else if (!this.parkingLot[slotNumber - 1]) {
            console.log('Sorry, No slot found with the number ' + slotNumber);
        } else if (this.parkingLot[slotNumber - 1].isOccupied == false) {
            console.log('Slot number ' + this.parkingLot[slotNumber - 1].id + ' is already free');
        } else {
            this.parkingLot[slotNumber - 1].isOccupied = false;
            delete this.parkingLot[slotNumber - 1].registrationNumber;
            delete this.parkingLot[slotNumber - 1].color;
            console.log('Slot number ' + this.parkingLot[slotNumber - 1].id + ' is freed');
        }
        return this.parkingLot;
    }
    status(param) {
        if (!param || !_.includes(['allocated', 'free'], param)) {
            console.log('ERROR: status: invalid input ');
            throw new Error('ERROR: status: invalid input ');
        } else if (param == 'allocated') {
            const json2csvParser = new Json2csvParser({ delimiter: '\t\t' });
            const csv = json2csvParser.parse(this.parkingLot.filter(x => x.isOccupied));
            console.log(csv);
            return this.parkingLot;
        } else if (param == 'free') {
            console.log('Free slots: ' + this.parkingLot.filter(x => !x.isOccupied).length);
            return this.parkingLot;
        }        
    }
}

module.exports = new ParkingManager();