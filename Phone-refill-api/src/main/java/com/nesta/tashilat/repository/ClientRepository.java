package com.nesta.tashilat.repository;

import com.nesta.tashilat.bean.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Integer> {

    Client findByPhone(String phone);
}
