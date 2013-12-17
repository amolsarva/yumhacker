class Api::CommentsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :only => [:create, :destroy]

  def index
    @comments = Establishment.find(params[:establishment_id]).comments.order(created_at: :desc).page(params[:page]).per(20)
  end
  
  def create 
    body = params[:body]
    id = params[:establishment_id]

    if current_user
      @comment = if body && !body.blank? && body.length < 255
        body.strip!
        current_user.comments.create!(establishment_id: id, body: body)
      end 
    end
  end

  def destroy 
    comment = Comment.find(params[:id])
    if current_user.id == comment.user_id
      if comment.destroy
        render json: { success: true }
      end
    end
  end
end