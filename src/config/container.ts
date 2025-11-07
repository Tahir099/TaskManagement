// TypeDI decorator'ları (@Service, @Inject) kullanıldığında,
// sınıfların import edilmesi gerekiyor ki decorator'lar çalışsın.
// Tüm DI ile ilgili import'lar burada toplanıyor.

// Repository'ler
import "../repositories/implementations/user.repository";
import "../repositories/implementations/task.repository";

// Service'ler
import "../services/user.service";
import "../services/task.service";
import "../services/auth.service";

// Controller'lar
import "../controllers/user.controller";
import "../controllers/task.controller";
import "../controllers/auth.controller";
