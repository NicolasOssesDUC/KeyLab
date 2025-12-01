package com.keylab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.repository.OrdenItemRepository;

@Service
public class OrdenItemService {

    @Autowired
    private OrdenItemRepository ordenItemRepository;

    public List<OrdenItem> getAllOrdenItems() {
        return ordenItemRepository.findAll();
    }

    public OrdenItem getOrdenItemById(Long id) {
        return ordenItemRepository.findById(id).orElse(null);
    }

    public void deleteOrdenItem(Long id) {
        ordenItemRepository.deleteById(id);
    }
}
