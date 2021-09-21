package com.nesta.tashilat.controller;

import com.nesta.tashilat.bean.Transfer;
import com.nesta.tashilat.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:4210"})
@RestController
@RequestMapping("transfers")
public class TransferController {

    @Autowired
    private TransferRepository transferRepository;

    @GetMapping("/all")
    public List<Transfer> findAll() { return transferRepository.findAll(); }


    @GetMapping("/{id}")
    public ResponseEntity<Transfer> findById(@PathVariable String id) {

        Transfer r = transferRepository.findById(id);
        if(r != null)
            return new ResponseEntity<>(r,HttpStatus.OK);

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public Transfer save(@RequestBody Transfer transfer) { return transferRepository.save(transfer); }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        Transfer r = transferRepository.findById(id);

        if(r != null)
        {
            transferRepository.delete(r);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> update(@PathVariable String id,@RequestBody Transfer transfer){
        Transfer transferToUpdate = transferRepository.findById(id);

        if(transferToUpdate != null)
        {
            transferToUpdate.setAmount(transfer.getAmount());
            transferToUpdate.setDate(transfer.getDate());
            transferToUpdate.setReceiverFullName(transfer.getReceiverFullName());
            transferToUpdate.setReceiverPhone(transfer.getReceiverPhone());
            transferToUpdate.setState(transfer.getState());
            transferToUpdate.setServer(transfer.getServer());

            transferRepository.save(transferToUpdate);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

}
