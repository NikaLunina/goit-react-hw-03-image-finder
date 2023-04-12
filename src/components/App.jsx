import React, { Component } from 'react';

import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './App.styled';
import { Modal } from './Modal/Modal';
import { getImages } from './Api/api';
import { ImageGallery } from './ImageGallery/ImageGallary';
export class App extends Component {
  state = {
    searchText: '',
    showModal: false,
    images: null,
    page: 1,
    isLoading: false,
    error: null,
    per_page: 12,
    largeImage: null,
  };

  createSearchText = searchText => {
    this.setState({ searchText });
  };

  // componentDidUpdate(prevProps, prevState){
  //   const searchText = this.state.searchText.trim()

  //   if(prevProps.searchText!==searchText && searchText){
  //     getImages(searchText).then(({hits, totalHits}) => {
  //       this.setState({images: hits})
  //     })
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    const searchText = this.state.searchText.trim();
    if (prevState.searchText !== searchText && searchText) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      getImages(searchText)
        .then(({ hits }) => {
          this.setState({ images: hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      getImages(searchText, this.state.page)
        .then(({ hits }) => {
          this.setState({ images: [...this.state.images, ...hits] });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = e => {
    const largeImage = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        largeImage: largeImage,
      }));
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, images, largeImage, isLoading, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.createSearchText} />
        {isLoading && <Loader />}
        {error && `${error}`}
        {images && <ImageGallery images={images} openModal={this.openModal} />}
        {images && <Button nextPage={this.nextPage} />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={largeImage} />
        )}
      </Container>
    );
  }
}
