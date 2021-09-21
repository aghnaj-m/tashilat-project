package com.nesta.tashilat.controller;


import com.nesta.tashilat.bean.Client;
import com.nesta.tashilat.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:4210"})
@RestController
@RequestMapping("clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/all")
    public List<Client> findAll(){ return clientRepository.findAll(); }

    @PostMapping("/save")
    public void save(@RequestBody Client client) { clientRepository.save(client); }


}
