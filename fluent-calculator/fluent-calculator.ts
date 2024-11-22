
export interface ISeeder {
    seed(value: number): ISeeded;
}
  
export interface ISeeded {
    add(value: number): ISeeded;
    minus(value: number): ISeeded;
    undo(): ISeeded;
    redo(): ISeeded;
    result(): number;
}

export class Calculator implements ISeeder, ISeeded {
    
    private total: number = 0;
    private doneActions: number[] = [];
    private poppedActions: number[] = [];
  
    private constructor() {}
  
    static create(): ISeeder {
      return new Calculator();
    }
  
    seed(value: number): ISeeded {
      this.doneActions.push(value);
      this.total = value;
      return this;
    }


    add(input: number): ISeeded {
        this.total += input;
        this.doneActions.push(input);
        return this;  
    }

    minus(input: number): ISeeded {
        this.total -= input;
        this.doneActions.push(input);
        return this;  
    }

    undo(): ISeeded {
        this.updateActionsArray(this.doneActions,this.poppedActions);
        return this;  
    }

    redo(): ISeeded {
      
        this.updateActionsArray(this.poppedActions,this.doneActions)
        return this;
    }

    updateActionsArray(doneActions: number[], poppedActions: number[]): void{
        if(doneActions.length === 0) {
            return;
        }
        const indexToRemove = doneActions.length - 1;
        const elementToRemove = doneActions[indexToRemove];
        poppedActions.push(elementToRemove);
        doneActions.splice(indexToRemove, 1);
        this.sum();
    }
  
    private sum() {
        this.total = this.doneActions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    result(): number {
      return this.total;
    }
  }
