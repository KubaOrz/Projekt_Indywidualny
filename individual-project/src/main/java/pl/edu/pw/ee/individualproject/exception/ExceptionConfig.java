package pl.edu.pw.ee.individualproject.exception;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class ExceptionConfig {

    @AllArgsConstructor
    private static class ErrorMessage {

        private String message;
        private Date errorDate;
    }

    @ExceptionHandler(value = EntityNotFoundException.class)
    public ErrorMessage handleEntityNotFoundException(EntityNotFoundException e) {
        return new ErrorMessage(e.getMessage(), new Date());
    }

    @ExceptionHandler(value = InvalidTokenException.class)
    public ErrorMessage handleInvalidTokenException(InvalidTokenException e) {
        return new ErrorMessage(e.getMessage(), new Date());
    }

    @ExceptionHandler(value = UserAlreadyLoggedInException.class)
    public ErrorMessage handleUserAlreadyLoggedInException(UserAlreadyLoggedInException e) {
        return new ErrorMessage(e.getMessage(), new Date());
    }
}

