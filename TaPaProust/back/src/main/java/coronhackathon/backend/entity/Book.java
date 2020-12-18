package coronhackathon.backend.entity;

import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.*;

@Entity
public class Book {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String edition;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private long sold_by_id;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String price;

    public Book(String title, String author, String edition,
                String state, String language, long sold_by_id,
                String price){
        this.title = title;
        this.author = author;
        this.edition = edition;
        this.state = state;
        this.language = language;
        this.sold_by_id = sold_by_id;
        this.price = price;

    }
    ///////////////////////////////////////
    //////////     Methodes      //////////
    ///////////////////////////////////////

    public void update(Book bookUpdate){
        this.title = bookUpdate.title;
        this.author = bookUpdate.author;
        this.edition = bookUpdate.edition;
        this.state = bookUpdate.state;
        this.language = bookUpdate.language;
        this.price = bookUpdate.price;
    }

    ///////////////////////////////////////
    //////////      Getters      //////////
    ///////////////////////////////////////

    public long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getEdition() {
        return edition;
    }

    public String getLanguage() {
        return language;
    }

    public String getPrice() {
        return price;
    }

    public String getState() {
        return state;
    }

    public String getTitle() {
        return title;
    }

    public long getSold_by() {
        return sold_by_id;
    }

    ///////////////////////////////////////
    //////////      Setters      //////////
    ///////////////////////////////////////

    public void setId(long id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setSold_by(long sold_by_id) {
        this.sold_by_id = sold_by_id;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
