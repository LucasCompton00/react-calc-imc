import { useState } from 'react';
import styles from './App.module.css'
import {levels , calculateImc, level} from './helpers/imc'
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem'
const App = () => {
  
    const[heightField ,setHeightFild] = useState<number>(0);
    const[weightField ,setWeightFild] = useState<number>(0);
    const[toShow , setToShow] = useState< level | null> ( null);
    const handleCalculateButton = () => {
      if ( heightField && weightField){
        setToShow(calculateImc(heightField ,weightField));
      }
      else{
        alert('Prencha todos os campos')
      }
    }
    
    const handleBackButton = () => {
      setToShow(null);
      setHeightFild(0);
      setWeightFild(0);
         

    }
    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Enter") {
        if ( heightField && weightField){
          setToShow(calculateImc(heightField ,weightField));
        }
        else{
          alert('Prencha todos os campos')
        }
      }
    }

  return (
    <div className={styles.main}>
      <header>
              <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}> 
      <div className={styles.leftSide}>
        <h1> Calcule o seu IMC</h1>

        <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>      
         <input

         type="number"
         placeholder='Digite a sua altuta. Ex: 1.8 (em métros)'
         value={ heightField > 0 ? heightField : ''}
         onChange={ e => setHeightFild(parseFloat(e.target.value))}
         disabled = { toShow  ? true : false}
         onKeyDown={keyDownHandler}
         />

        <input
         type="number"
         placeholder='Digite o seu peso. Ex: 82,4  (em kg)'
         value={ weightField > 0 ? weightField : ''}
         onChange={ e => setWeightFild(parseFloat(e.target.value))}
         disabled = { toShow  ? true : false}
         onKeyDown={keyDownHandler}
         />

        <button onClick={handleCalculateButton} disabled = { toShow  ? true : false}>
          Calcular
        </button>
      </div>

      <div className={styles.rightSide}>
        {!toShow &&
          <div className={styles.grid}>
            {levels.map((item , key) => (
             <GridItem key={key} item={item} />
            )) }

          </div>
        }
        {toShow &&
          <div className = {styles.rightBig}>
            <div className={styles.rigthArrow} onClick={handleBackButton}>
              <img src={leftArrowImage} alt="" width={25} />
            </div>
            <GridItem item={toShow}/>
          </div>
        }
      </div>
      
      </div>
    </div>
  );
}
export default App;