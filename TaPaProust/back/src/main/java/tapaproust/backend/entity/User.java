package tapaproust.backend.entity;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false)
    private String pwdHash;

    @Column(columnDefinition = "boolean default false")
    private boolean enabled;

    private String phone;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPwdHash() {
        return pwdHash;
    }

    public void setPwdHash(String pwdHash) {
        this.pwdHash = pwdHash;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
