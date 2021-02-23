package tapaproust.backend.entity;

import org.springframework.web.bind.annotation.RequestParam;

import javax.imageio.ImageIO;
import javax.persistence.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

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
    private long soldById;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String price;

    @Column(name="photos")
    @ElementCollection(targetClass=String.class)
    private List<String> photos;

    ///////////////////////////////////////
    //////////     Methodes      //////////
    ///////////////////////////////////////

    public void update(String title, String author, String edition, String state, String language, String price, String photos) throws IOException {
        this.title = title;
        this.author = author;
        this.edition = edition;
        this.state = state;
        this.language = language;
        this.price = price;
        setPhotos(photos);
    }

    private List<String> stringToList(String s){
        return new ArrayList<String>(Arrays.asList(s.split(";")));
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

    public long getSoldById() {
        return soldById;
    }

    public List<String> getPhotos() {
        return photos;
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

    public void setSoldById(long soldById) {
        this.soldById = soldById;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPhotos(String photos) throws IOException {
        List<String> photosBase64 = stringToList(photos);
        this.photos = new ArrayList<>();
        Random rn = new Random(); int rand = rn.nextInt(900000)+100000;

        for(String imgBase64 : photosBase64){
            String destinationPath = "resources/"
                    + Long.toString(getId()) + "_" + rand
                    + ".jpg";

            byte[] byteImg = Base64.getDecoder().decode(imgBase64);
            BufferedImage img = ImageIO.read(new ByteArrayInputStream(byteImg));
            ImageIO.write(img, "jpg", new File("src/main/" + destinationPath));
            this.photos.add(destinationPath);
        }
    }
}
