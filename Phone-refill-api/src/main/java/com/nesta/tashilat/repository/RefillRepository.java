package com.nesta.tashilat.repository;

import com.nesta.tashilat.bean.Refill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RefillRepository extends JpaRepository<Refill,Integer> {

     Refill findById(int id);

     Refill save(Refill refill);

    @Query(value = "SELECT * FROM refill r WHERE r.client_phone = :client_phone", nativeQuery = true)
    List<Refill> findRefillsForClient(@Param("client_phone") String client_phone);
}
