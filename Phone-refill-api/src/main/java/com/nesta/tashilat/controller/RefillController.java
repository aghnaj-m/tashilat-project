package com.nesta.tashilat.controller;

import com.nesta.tashilat.bean.Refill;
import com.nesta.tashilat.repository.RefillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:4210"})
@RestController
@RequestMapping("refills")
public class RefillController {

    @Autowired
    private RefillRepository refillRepository;

    @GetMapping("/all")
    public List<Refill> findAll() { return refillRepository.findAll(); }


    @GetMapping("/{id}")
    public ResponseEntity<Refill> findById(@PathVariable String id) {

        Refill r = refillRepository.findById(Integer.parseInt(id));
        if(r != null)
            return new ResponseEntity<>(r,HttpStatus.OK);

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/client/{phone_num}")
    public ResponseEntity<List<Refill>> findForUser(@PathVariable String phone_num)
    {
        List<Refill> refills = refillRepository.findRefillsForClient(phone_num);
        if(refills != null && refills.size() > 0)
            return new ResponseEntity(refills, HttpStatus.OK);

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public Refill save(@RequestBody Refill refill) { return refillRepository.save(refill); }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        Refill r = refillRepository.findById(Integer.parseInt(id));

        if(r != null)
        {
            refillRepository.delete(r);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> update(@PathVariable String id,@RequestBody Refill refill){
        Refill refillToUpdate = refillRepository.findById(Integer.parseInt(id));

        if(refillToUpdate != null)
        {
            refillToUpdate.setAmount(refill.getAmount());
            refillToUpdate.setOffer(refill.getOffer());
            refillToUpdate.setDate(refill.getDate());
            refillToUpdate.setClient(refill.getClient());
            refillToUpdate.setServer(refill.getServer());

            refillRepository.save(refillToUpdate);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

}
