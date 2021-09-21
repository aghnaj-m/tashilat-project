package com.nesta.tashilat.controller;

import com.nesta.tashilat.bean.Bill;
import com.nesta.tashilat.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200","http://localhost:4210"})
@RestController
@RequestMapping("bills")
public class BillController {

    @Autowired
    private BillRepository billRepository;

    @GetMapping("/all")
    public List<Bill> findAll() { return billRepository.findAll(); }


    @GetMapping("/{id}")
    public ResponseEntity<Bill> findById(@PathVariable String id) {

        Bill b = billRepository.findById(Integer.parseInt(id));
        if(b != null)
            return new ResponseEntity<>(b,HttpStatus.OK);

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/client/{contract_id}")
    public ResponseEntity<List<Bill>> findForUser(@PathVariable String contract_id)
    {
        List<Bill> bills = billRepository.findBillsForClient(Integer.parseInt(contract_id));
        if(bills != null && bills.size() > 0)
            return new ResponseEntity(bills, HttpStatus.OK);

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public Bill save(@RequestBody Bill bill) { return  billRepository.save(bill); }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable (required = true) String id){
        Bill b = billRepository.findById(Integer.parseInt(id));

        if(b != null)
        {
            billRepository.delete(b);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> update(@PathVariable String id,@RequestBody Bill bill){
        Bill billToUpdate = billRepository.findById(Integer.parseInt(id));

        if(billToUpdate != null)
        {
            billToUpdate.setAmount(bill.getAmount());
            billToUpdate.setClient_number(bill.getClient_number());
            billToUpdate.setContract_number(bill.getContract_number());
            billToUpdate.setDate(bill.getDate());
            billToUpdate.setDeadline(bill.getDeadline());
            billToUpdate.setType(bill.getType());
            billToUpdate.setServer(bill.getServer());
            billToUpdate.setPaid(bill.isPaid());
            billRepository.save(billToUpdate);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

}
