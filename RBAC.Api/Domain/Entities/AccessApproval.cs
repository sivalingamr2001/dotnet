using RBAC.Api.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RBAC.Api.Domain.Entities;

public class AccessApproval
{
    public int Id { get; set; }
    public int AccessRequestId { get; set; }
    public AccessRequest? AccessRequest { get; set; }
    [Required]
    public string EmpId { get; set; } = null!;
    public ApprovalType TypeOfAccessApproval { get; set; }
    public string? Comments { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public string CreatedBy { get; set; } = null!;
    public string? ModifiedBy { get; set; }
}
