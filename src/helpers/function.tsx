//  const shorten = (title) => {
//     const splitedTitle = title.split(" ")
//      const newTitle = `${splitedTitle[0]} ${splitedTitle[1]}`
//      return newTitle
// }
const  isInCart = ((state:any , productId:any) => {
       const result = !!state.selectedItem.find(item => item.productId  === productId) 
       return result
})
const quantityCount = (state:any , uniqueId:any)=> {
    const index = state.selectedItem.findIndex(item => item.uniqueId === uniqueId)
     if(index === -1){
        return false
     } else{
        return state.selectedItem[index].quantityy;
     }
}

const quantityCountOptions = (state:any , id:any)=> {
   const index = state.selectedItem.findIndex(item => item.id === id)
    if(index === -1){
       return false
    } else{
       return state.selectedItem[index].quantityy;
    }
}



export { isInCart  , quantityCount, quantityCountOptions}