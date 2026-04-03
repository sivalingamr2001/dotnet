using RBAC.Api.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RBAC.Api.Domain.Entities;

public class AccessRequest
{
    public int Id { get; set; }
    [Required]
    public string EmpId { get; set; } = null!;
    public EmpMast? Employee { get; set; }
    public int AccessDetailsId { get; set; }
    public AccessDetails? AccessDetails { get; set; }
    public AccessStatus Status { get; set; } = AccessStatus.PendingHOD;
    public DateTime CreatedOn { get; set; }
    public DateTime? ModifiedOn { get; set; }
    public string CreatedBy { get; set; } = null!;
    public string? ModifiedBy { get; set; }
    public bool IsAgreed { get; set; }
    public string? ITSRNumber { get; set; }
    public bool IsRevoke { get; set; }
    public ICollection<AccessApproval> Approvals { get; set; } = new List<AccessApproval>();
}
