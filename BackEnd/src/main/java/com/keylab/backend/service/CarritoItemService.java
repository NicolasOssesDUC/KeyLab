package com.keylab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.repository.CarritoItemRepository;

@Service
public class CarritoItemService {

    @Autowired
    private CarritoItemRepository carritoItemRepository;

    public List<CarritoItem> getAllCarritoItems() {
        return carritoItemRepository.findAll();
    }
    
    public CarritoItem getCarritoItemById(Long id) {
        return carritoItemRepository.findById(id).orElse(null);
    }

    public CarritoItem createCarritoItem(CarritoItem carritoItem) {
        carritoItem.setId(null);
        return carritoItemRepository.save(carritoItem);
    }

    public void deleteCarritoItem(Long id) {
        carritoItemRepository.deleteById(id);
    }


    
}
