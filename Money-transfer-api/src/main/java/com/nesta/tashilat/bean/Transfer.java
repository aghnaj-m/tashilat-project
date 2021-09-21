package com.nesta.tashilat.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class Transfer {

    @Id
    @GeneratedValue(generator = "custom-generator", strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "custom-generator", strategy = "com.nesta.tashilat.service.CustomIdentifierGenerator")
    protected String id;

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private String receiverFullName;

    @Column(nullable = false)
    private String receiverPhone;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(columnDefinition="varchar(50) default 'in hold'")
    private String state;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User server;

    public Transfer(){ }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getReceiverFullName() {
        return receiverFullName;
    }

    public void setReceiverFullName(String receiverFullName) {
        this.receiverFullName = receiverFullName;
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public User getServer() {
        return server;
    }

    public void setServer(User server) {
        this.server = server;
    }

    @Override
    public String toString() {
        return "Transfer{" +
                "id=" + id +
                ", amount=" + amount +
                ", receiverFullName='" + receiverFullName + '\'' +
                ", receiverPhone='" + receiverPhone + '\'' +
                ", date=" + date +
                ", state=" + state +
                ", server=" + server +
                '}';
    }
}
