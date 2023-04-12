
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

export const ImageGallery = ({ images, openModal }) => (
  <ul className={css.ImageGallery}>
     {images.map((image) => (
      <ImageGalleryItem openModal={openModal} image={image} key={image.id} />
    ))}
  </ul>
);

