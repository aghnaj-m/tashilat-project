package com.nesta.tashilat.repository;

import com.nesta.tashilat.bean.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TransferRepository extends JpaRepository<Transfer,Integer> {

     Transfer findById(String id);

     Transfer save(Transfer transfer);

}
