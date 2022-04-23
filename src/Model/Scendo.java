package Model;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Calendar;

public class Scendo {

    private final String creator_user_id;
    private final String scendo_id;
    private String location;
    private java.util.Date time;
    private ArrayList<String> invited_users_id;

    public Scendo(String scendoId, String creatorUserId, String location, java.util.Date time){

        this.scendo_id = scendoId;
        this.creator_user_id = creatorUserId;
        this.location = location;
        this.time = time;
        this.invited_users_id = new ArrayList<String>();

    }
    
    public void setLocation(String location){

        this.location = location;
    }
    
    public void setTime(java.util.Date time){

        this.time = time;
    }

    public void addInvitedUser(String userId){
        
        if (this.invited_users_id.contains(userId) == false)
            this.invited_users_id.add(userId);
        
    }

    public void removeInvitedUser(String userId){

        this.invited_users_id.remove(userId);

    }

    public boolean checkInvitedUser(String userId){
        
        return this.invited_users_id.contains(userId);

    }

    public String getCreatorUserID(){

        return this.creator_user_id;

    }

    public String getScendoID(){

        return this.scendo_id;

    }

    public java.util.Date getTime(){

        return this.time;

    }

    public String getLocation(){

        return this.location;

    }

    public ArrayList<String> getInvitedUsers(){

        ArrayList<String> copy = new ArrayList<String>();
        copy.addAll(this.invited_users_id);

        return copy;

    }


}