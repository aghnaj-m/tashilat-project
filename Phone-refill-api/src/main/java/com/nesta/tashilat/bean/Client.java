package com.nesta.tashilat.bean;

import javax.persistence.*;

@Entity
@Table
public class Client {

    @Id
    private String phone;

    @Column(nullable = false)
    private String operator;

    public Client() {
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    @Override
    public String toString() {
        return "Client{" +
                "phone='" + phone + '\'' +
                ", operator='" + operator + '\'' +
                '}';
    }
}
