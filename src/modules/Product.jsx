
//                        props
export const Product  = ({ data }) => { // props = { data: {image, price, title }}, деструктурировали(вытащили data)

  //console.log(props)

  return (

    <li className="products__item">
      <article className="product">
        <img className="product__image" src={data.image} alt={data.title} />

        <div className="product__content">
          <h3 className="product__title"> {data.title} </h3>
          <p className="product__price"> {data.price} P</p>
        </div>
      </article>
    </li>
  )
};