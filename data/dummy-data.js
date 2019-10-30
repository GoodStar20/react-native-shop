import Product from '../models/products'

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Sony - 55',
    'https://res.cloudinary.com/djagznbnb/image/upload/c_scale,w_178/v1570985710/tv1.jpg',
    'Sony 55" Class OLED A8G Series 2160p Smart 4K UHD TV with HDR',
    1499.99
  ),
  new Product(
    'p2',
    'u1',
    'Samsung',
    'https://res.cloudinary.com/djagznbnb/image/upload/v1570985711/comp4.jpg',
    'Samsung - Surface Pro 6 12.3" Touch-Screen Intel Core i7 8GB Memory 256GB Solid State Drive Black Left_Zoom',
    2499.99
  ),
  new Product(
    'p3',
    'u2',
    'LG',
    'https://res.cloudinary.com/djagznbnb/image/upload/v1570985711/tv7.jpg',
    'VIZIO - 32" Class LED  D-Series 1080p Smart HDTV',
    499.99
  ),
  new Product(
    'p4',
    'u3',
    'DELL Limited Edition',
    'https://res.cloudinary.com/djagznbnb/image/upload/v1570985711/comp3.jpg',
    'Dell - Inspiron 2-in-1 13.3" 4K Ultra HD Touch-Screen Laptop Intel Core i7  512GB SSD + Optane Black',
    799.99
  ),
  new Product(
    'p5',
    'u3',
    'DELL',
    'https://res.cloudinary.com/djagznbnb/image/upload/v1570985711/tv6.jpg',
    'Dell - Inspiron 2-in-1 13.3" 4K Ultra HD Touch-Screen Laptop Intel Core i7  512GB SSD + Optane Black',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'ACER',
    'https://res.cloudinary.com/djagznbnb/image/upload/v1570985710/comp5.jpg',
    'Acer - 11.6" Refurbished Chromebook - Intel Celeron - 4GB Memory - 16GB Solid State Drive - Gray',
    555.49
  ),
  new Product(
    'p7',
    'u1',
    'HP-Pavilion',
    'https://res.cloudinary.com/djagznbnb/image/upload/v1570985710/comp1.jpg',
    'New!HP - Pavilion x360 2-in-1 14 Touch-Screen Laptop - Intel Core i3 - 8GB Memory - 128GB Solid State Drive',
    1555.49
  )
];

export default PRODUCTS;
