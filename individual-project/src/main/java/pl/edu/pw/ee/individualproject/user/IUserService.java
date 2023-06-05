package pl.edu.pw.ee.individualproject.user;

import pl.edu.pw.ee.individualproject.auth.DTO.AuthenticationResponse;
import pl.edu.pw.ee.individualproject.user.DTO.BasicPurchaserData;
import pl.edu.pw.ee.individualproject.user.DTO.BasicSupplierData;
import pl.edu.pw.ee.individualproject.user.DTO.ProfileEditionRequest;
import pl.edu.pw.ee.individualproject.user.DTO.UserProfileData;

public interface IUserService {

    BasicSupplierData getBasicSupplierData(String email);

    BasicPurchaserData getBasicPurchaserData(String email);

    AuthenticationResponse changeUserProfile(ProfileEditionRequest request);

    UserProfileData getUserProfileData(String email);
}
