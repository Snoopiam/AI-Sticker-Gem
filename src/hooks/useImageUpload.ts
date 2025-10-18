import React from 'react';
import { Action } from '../state/types';

export const useImageUpload = (dispatch: React.Dispatch<Action>) => {
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      dispatch({ 
        type: 'GENERATION_ERROR', 
        payload: { error: 'Please upload a PNG, JPEG, or WebP image.' } 
      });
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      dispatch({ 
        type: 'GENERATION_ERROR', 
        payload: { error: 'Image size must be less than 10MB.' } 
      });
      return;
    }

    // Read file and convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      dispatch({ 
        type: 'SET_SOURCE_IMAGE', 
        payload: { dataUrl } 
      });
    };
    reader.onerror = () => {
      dispatch({ 
        type: 'GENERATION_ERROR', 
        payload: { error: 'Failed to read image file.' } 
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    dispatch({ type: 'REMOVE_SOURCE_IMAGE' });
  };

  return { handleImageChange, removeImage };
};

