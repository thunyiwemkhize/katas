import { Calculator } from "./fluent-calculator";

describe('FluentCalculator', ()=>{
    it('should do return results if no other calls are called', ()=>{
    
        // Arrange
        const seed = 5;
        
        // Act
        const actual = Calculator.create().seed(seed).result();
        
        // Assert
        expect(actual).toBe(5);
    });

    describe('Add', ()=>{
        it('should return sum of 15 if added 10 to seed of 5', () => {
            // Arrange
            const seed = 5;
            const input = 10;
            
            // Act
            const actual = Calculator.create()
               .seed(seed)
               .add(input)
               .result();
   
            // Assert
            expect(actual).toBe(15);
       });
   
       it('should return sum of 1400 if added -200 to seed of 1600', () => {
            // Arrange
           const seed = 1600;
           const input = -200;
           
           // Act
           const actual = Calculator.create()
           .seed(seed)
              .add(input)
              .result();
   
           // Assert
           expect(actual).toBe(1400);
      });
    });

    describe('Minus', ()=>{
        it('should return sum of 11 if subtracting 9 to a seed of 20', ()=>{
            // Arrange
            const seed = 20;
            const input = 9;
            
            // Act
            const actual = Calculator.create()
                .seed(seed)
                .minus(input)
                .result();
    
            // Assert
            expect(actual).toBe(11);
        });

        it('should return sum of 0 if subtracting 100 to a seed of 100', ()=>{
            // Arrange
            const seed = 100;
            const input = 100;
            
            // Act
            const actual = Calculator.create()
                .seed(seed)
                .minus(input)
                .result();
    
            // Assert
            expect(actual).toBe(0);
        });
    });

    describe('Undo', ()=>{
        it('should return a sum of 10 when adding 5 and undoing form a seed of 10', ()=> {
            const seed = 10;
            const input = 5;
            // Act
            
            const actual = Calculator.create()
               .seed(seed)
               .add(input)
               .undo()
               .result();
    
            // Assert
    
            expect(actual).toBe(10);
        });

        it('should return a sum of 125 when adding 200 and undoing form a seed of 125', ()=> {
            const seed = 125;
            const input = 200;
            // Act
            
            const actual = Calculator.create()
               .seed(seed)
               .add(input)
               .undo()
               .result();
    
            // Assert
            expect(actual).toBe(125);
        });

        it('should return a sum of -36 when adding [54,-27,99] and undoing 3x form a seed of -36', ()=> {
            const seed = -36;
            const input1 = 54;
            const input2 = -27;
            const input3 = 99;
            // Act
            
            const actual = Calculator.create()
               .seed(seed)
               .add(input1)
               .add(input2)
               .add(input3)
               .undo()
               .undo()
               .undo()
               .result();
    
            // Assert
            expect(actual).toBe(-36);
        });
    });

    describe('Redo', () =>{
        it('should return a sum of 50 if adding 6 to a seed of 44 and undoing and redoing',() => {
            const seed = 44;
            const input = 6;
            // Act
            
            const actual = Calculator.create()
               .seed(seed)
               .add(input)
               .undo()
               .redo()
               .result();
    
            // Assert
    
            expect(actual).toBe(50);
        });
    });

    describe('NothingToRedo', () => {
        it('should not do anything when redoing without adding or subtracting', () =>{
            const seed = 44;
            // Act
            
            const actual = Calculator.create()
                .seed(seed)
                .redo()
                .redo()
                .result();
    
            // Assert
    
            expect(actual).toBe(44);
        });

        
        it('should not do anything when redoing without adding or subtracting', () =>{
            const seed = 44;
            // Act
            
            const actual = Calculator.create()
                .seed(seed)
                .minus(2)
                .undo()
                .redo()
                .undo()
                .redo()
                .undo()
                .redo()
                .result();
    
            // Assert
            expect(actual).toBe(46);
        });
    });
});