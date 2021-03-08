package tapaproust.backend.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test {
    public static void main(String args []){
        String l = "ee\n";
        System.out.println(l.substring(0,l.length()-1));
    }
    private static final String EMAIL_PATTERN = "[_A-Za-z-+]+(.[_A-Za-z-]+)*@" + "edu.ge.ch";
    private static boolean validateEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
    private static boolean validatePhone(String phone) {
        return phone.startsWith("+") && phone.substring(1).chars().allMatch( Character::isDigit );
    }
}
