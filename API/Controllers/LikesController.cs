
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {

        private readonly IUnitOfWork _uow;

        public LikesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IUnitOfWork Uow { get; }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {

            var sourceUserID = User.GetUserId();
            var likedUser = await _uow.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _uow.LikesRepository.GetUserWithLikes(sourceUserID);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("NE mozes samog sebe lajkovati legendo!");

            var userLike = await _uow.LikesRepository.GetUserLike(sourceUserID, likedUser.Id);

            if (userLike != null) return BadRequest("Vec si ga lajkovao majstore");

            userLike = new Entities.UserLike
            {
                SourceUserId = sourceUserID,
                TargetUserId = likedUser.Id

            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _uow.Complete()) return Ok();

            return BadRequest("NIsmo uspeli da lajkujemo");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLIkes([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();

            var users = await _uow.LikesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));

            return Ok(users);
        }
    }
}

