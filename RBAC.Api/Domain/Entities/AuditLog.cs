using RBAC.Api.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RBAC.Api.Domain.Entities;

public class AuditLog
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    [Required]
    public string Actor { get; set; } = null!;
    public AuditAction Action { get; set; }
    public int ResourceId { get; set; }
    public string Resource { get; set; } = null!;
    public string? Details { get; set; }
}
