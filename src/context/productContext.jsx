import { createContext, useContext, useState } from "react"

// в реакт используется контекст -это некое хранилище, котрое мы создаем, там описываем логику и 
//когла меняются внтури данные, мы  влюбом компоненте можем к этим данным обратиться и перерисовать компонент


const ProductContext = createContext(); // создался контекст

export const ProductProvider = ({ children }) => { // провайдер котрый передает инормацию межд компонентами
  // children-компонентв котрые  будетт иметь доступ к данным в ProductContext
  
  // завели перем-ые состояния products и category
  const [ products, setProducts ] = useState([]); 

  const [ category, setCategory ] = useState(""); 

  useEffect(() => {
    if(category){
      fetch(`${API_URL}/api/products/${category}`)
        .then(response => {
          if(!response.ok){
            throw new Error(response.statusText);   // если будет ишбка то в след then не зайдем
          }
            
          return response.json();
        })
        .then((data) => setProducts(data))        // data = [{}, {}]
        .catch(err => console.error("error in fetching ", err))
    }
  }, [ category ]);  // при каждой смене category вызовется переданный колбэк


  return (
    <ProductContext.Provider  value={{ products, setCategory }}>
        {children}   {/* children имеют доступ к products, setCategory  */}
    </ProductContext.Provider>
  )
};


export const useProducts = () => useContext(ProductContext);