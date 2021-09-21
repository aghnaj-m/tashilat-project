package com.nesta.tashilat.repository;

import com.nesta.tashilat.bean.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill,Integer> {

     Bill findById(int id);

    Bill save(Bill bill);

    @Query(value = "SELECT * FROM bill b WHERE b.contract_number = :contract_number", nativeQuery = true)
    List<Bill> findBillsForClient(@Param("contract_number") Integer contract_number);
}
