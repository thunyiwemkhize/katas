export class Calculator{
 
    private total: number;
    private doneActions: number[] = [];
    private poppedActions: number[] = [];

    constructor() {
        this.total = 0;
    }

    seed(value: number): this {
        this.total = value;
        this.doneActions.push(value);
        return this;
    }

    add(input: number) {
        this.total += input;
        this.doneActions.push(input);
        return this;  
    }

    undo() {
        const indexToRemove = this.doneActions.length - 1;
        const elementToRemove = this.doneActions[indexToRemove];
        this.poppedActions.push(elementToRemove);
        this.doneActions.splice(indexToRemove, 1);
        this.total = this.doneActions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return this;  
    }

    redo() {
        if(this.poppedActions.length === 0) {
            return this;
        }
        const indexToRemove = this.poppedActions.length - 1;
        const elementToRemove = this.poppedActions[indexToRemove];
        this.doneActions.push(elementToRemove);
        this.poppedActions.splice(indexToRemove,1);
        this.total = this.doneActions.reduce((accumulator, currentValue) => accumulator + currentValue, 0); 
        return this;
    }

    minus(input: number) {
        this.total -= input;
        this.doneActions.push(input);
        return this;  
    }

    result(): number {
        return this.total;
    }
}