/**
 * Notifications rules
 *
 * Templates for `text`, `bundledText` and `GOTO` are handlebars templates.
 * There are several custom Handlebars helpers defined in `../helpers/notifications.js`
 */
import {
  NOTIFICATION_TYPE,
  ROLE_CONNECT_COPILOT, ROLE_CONNECT_MANAGER, ROLE_ADMINISTRATOR,
  PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER
} from '../../../config/constants'

const GOTO = {
  PROJECT_DASHBOARD: '/projects/{{projectId}}',
  PROJECT_SPECIFICATION: '/projects/{{projectId}}/specification',
  PROJECT_PLAN: '/projects/{{projectId}}/plan',
  TOPIC: '/projects/{{projectId}}/#feed-{{topicId}}',
  POST: '/projects/{{projectId}}/#comment-{{postId}}',
  FILE_LIST: '/projects/{{projectId}}/specification#appDefinition-files',
  PHASE: '/projects/{{projectId}}/plan#phase-{{phaseId}}'
}

// each notification can be displayed differently depend on WHO see them
// that's why each notification can have several rules to display which describe user roles
// NOTE for each version of notification have to repeat ALL rules, even if some rules are not changed
export const NOTIFICATIONS = [
  // Outside project
  {
    eventType: 'notifications.connect.project.created',
    type: NOTIFICATION_TYPE.NEW_PROJECT,
    rules: [{
      text: 'Your Project was created successfully',
      projectRoles: [PROJECT_ROLE_OWNER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.active',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Your project is now active',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_DASHBOARD
    }, {
      text: 'A project has been set to active',
      topcoderRoles: [ROLE_CONNECT_COPILOT, ROLE_CONNECT_MANAGER, ROLE_ADMINISTRATOR],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.submittedForReview',
    type: NOTIFICATION_TYPE.REVIEW_PENDING,
    rules: [{
      text: 'Your project is now in review',
      projectRoles: [PROJECT_ROLE_OWNER]
    }, {
      text: 'Project is available for review',
      topcoderRoles: [ROLE_CONNECT_MANAGER, ROLE_ADMINISTRATOR],
      goTo: GOTO.PROJECT_SPECIFICATION
    }]
  },

  {
    eventType: 'notifications.connect.project.approved',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Your project was approved, work will soon start',
      projectRoles: [PROJECT_ROLE_OWNER]
    }, {
      text: 'Project is available for pickup',
      topcoderRoles: [ROLE_CONNECT_COPILOT, ROLE_ADMINISTRATOR],
      goTo: GOTO.PROJECT_DASHBOARD
    }, {
      text: 'Project was approved',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.paused',
    type: NOTIFICATION_TYPE.REVIEW_PENDING,
    rules: [{
      text: 'Your project was paused',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }, {
      text: 'A project was paused',
      topcoderRoles: [ROLE_ADMINISTRATOR],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.completed',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Your project completed successfully!',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_DASHBOARD
    }, {
      text: 'A project was completed',
      topcoderRoles: [ROLE_ADMINISTRATOR],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.canceled',
    type: NOTIFICATION_TYPE.WARNING,
    rules: [{
      text: 'Your project was canceled. If you think that was a mistake...',
      projectRoles: [PROJECT_ROLE_OWNER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  // User management
  {
    eventType: 'notifications.connect.project.member.joined',
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [{
      text: 'A new team member joined your project',
      shouldBundle: true,
      bundledText: '{{bundledCount}} new team members joined your project',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.member.left',
    type: NOTIFICATION_TYPE.WARNING,
    rules: [{
      text: '<strong>{{userHandle}}</strong> left a project',
      shouldBundle: true,
      bundledText: '{{bundledCount}} team members left your project',
      projectRoles: [PROJECT_ROLE_MANAGER]
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.member.left',
    type: NOTIFICATION_TYPE.WARNING,
    rules: [{
      text: '<strong>{{userFullName}}</strong> left a project',
      shouldBundle: true,
      bundledText: '{{bundledCount}} team members left your project',
      projectRoles: [PROJECT_ROLE_MANAGER]
    }]
  },

  {
    eventType: 'notifications.connect.project.member.removed',
    type: NOTIFICATION_TYPE.WARNING,
    rules: [{
      text: '<strong>{{userHandle}}</strong> was removed from project',
      shouldBundle: true,
      bundledText: '{{bundledCount}} team members were removed from your project',
      projectRoles: [PROJECT_ROLE_MANAGER]
    }, {
      text: 'You were removed from a project',
      toUserHandle: true
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.member.removed',
    type: NOTIFICATION_TYPE.WARNING,
    rules: [{
      text: '<strong>{{userFullName}}</strong> was removed from project',
      shouldBundle: true,
      bundledText: '{{bundledCount}} team members were removed from your project',
      projectRoles: [PROJECT_ROLE_MANAGER]
    }, {
      text: 'You were removed from a project',
      toUserHandle: true
    }]
  },

  {
    eventType: 'notifications.connect.project.member.assignedAsOwner',
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [{
      text: 'You are now the owner of project',
      toUserHandle: true,
      goTo: GOTO.PROJECT_DASHBOARD
    }, {
      text: 'Project owner was changed to <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.member.assignedAsOwner',
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [{
      text: 'You are now the owner of project',
      toUserHandle: true,
      goTo: GOTO.PROJECT_DASHBOARD
    }, {
      text: 'Project owner was changed to <strong>{{userFullName}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.member.copilotJoined',
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [{
      text: 'A copilot joined your project team',
      shouldBundle: true,
      bundledText: '{{bundledCount}} copilots joined your project team',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.member.managerJoined',
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [{
      text: 'A manager joined your project team',
      shouldBundle: true,
      bundledText: '{{bundledCount}} managers joined your project team',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.topic.created',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userHandle}}</strong> created a new post ',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.TOPIC
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.topic.created',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userFullName}}</strong> created a new post ',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.TOPIC
    }]
  },

  {
    eventType: 'notifications.connect.project.post.created',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userHandle}}</strong> responded to your post',
      shouldBundle: true,
      bundledText: '{{#showMore __history__ 3}}<strong>{{userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts to your topic',
      toTopicStarter: true,
      goTo: GOTO.POST
    }, {
      text: '<strong>{{userHandle}}</strong> responded to a post',
      shouldBundle: true,
      bundledText: '{{#showMore __history__ 3}}<strong>{{userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.POST
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.post.created',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userFullName}}</strong> responded to your post',
      shouldBundle: true,
      bundledText: '{{#showMore __history__ 3}}<strong>{{fallback userFullName userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts to your topic',
      toTopicStarter: true,
      goTo: GOTO.POST
    }, {
      text: '<strong>{{userFullName}}</strong> responded to a post',
      shouldBundle: true,
      bundledText: '{{#showMore __history__ 3}}<strong>{{fallback userFullName userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.POST
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.post.edited',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userFullName}}</strong> edited post',
      shouldBundle: true,
      bundledText: '{{#showMore __history__ 3}}<strong>{{fallback userFullName userHandle}}</strong>{{/showMore}} edited {{bundledCount}} posts',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      toTopicStarter: true,
      goTo: GOTO.POST
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.post.mention',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userFullName}}</strong> mentioned you in a post',
      toUserHandle: true,
      goTo: GOTO.POST
    }]
  },

  {
    eventType: 'notifications.connect.project.linkCreated',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userHandle}}</strong> added a link to your project',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.linkCreated',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userFullName}}</strong> added a link to your project',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_DASHBOARD
    }]
  },

  {
    eventType: 'notifications.connect.project.fileUploaded',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userHandle}}</strong> added a new file',
      shouldBundle: true,
      bundledText: '{{bundledCount}} new files were added',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.FILE_LIST
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.fileUploaded',
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [{
      text: '<strong>{{userFullName}}</strong> added a new file',
      shouldBundle: true,
      bundledText: '{{bundledCount}} new files were added',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.FILE_LIST
    }]
  },

  {
    eventType: 'notifications.connect.project.specificationModified',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: '<strong>{{userHandle}}</strong> updated the project specification',
      shouldBundle: true,
      bundledText: 'Project specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_SPECIFICATION
    }]
  }, {
    version: 2,
    eventType: 'notifications.connect.project.specificationModified',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: '<strong>{{userFullName}}</strong> updated the project specification',
      shouldBundle: true,
      bundledText: 'Project specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_SPECIFICATION
    }]
  },
  {
    eventType: 'notifications.connect.project.planReady',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Project plan is ready',
      shouldBundle: true,
      bundledText: 'Project plan is ready for your project. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_PLAN
    }, {
      text: 'Project plan is ready for <strong>{{projectName}}</strong>',
      shouldBundle: true,
      bundledText: 'Project plan is ready. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_PLAN
    }]
  },
  {
    eventType: 'notifications.connect.project.planModified',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Project plan is modified',
      shouldBundle: true,
      bundledText: 'Project plan is modified {{bundledCount}} times for your project. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_PLAN
    }, {
      text: 'Project plan is modified for <strong>{{projectName}}</strong>',
      shouldBundle: true,
      bundledText: 'Project plan is modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_PLAN
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.transition.active',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Phase <strong>{{phaseName}}</strong> is activated',
      shouldBundle: true,
      bundledText: '{{bundledCount}} phases are activated. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: 'Phase <strong>{{phaseName}}</strong> is activated',
      shouldBundle: true,
      bundledText: '{{bundledCount}} phases are activated. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.transition.completed',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Phase <strong>{{phaseName}}</strong> is completed',
      shouldBundle: true,
      bundledText: '{{bundledCount}} phases are completed. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: 'Phase <strong>{{phaseName}}</strong> is completed',
      shouldBundle: true,
      bundledText: '{{bundledCount}} phases are completed. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.update.payment',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Budget/Payment for <strong>{{phaseName}}</strong> is updated',
      shouldBundle: true,
      bundledText: 'Budget/Payments updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: 'Budget/Payment for <strong>{{phaseName}}</strong>',
      shouldBundle: true,
      bundledText: 'Budget/Payments updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.update.progress',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Phase <strong>{{phaseName}}</strong> is completed',
      shouldBundle: true,
      bundledText: 'Progress updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: 'Phase <strong>{{phaseName}}</strong> is completed',
      shouldBundle: true,
      bundledText: 'Progress updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.update.scope',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: '<strong>{{userHandle}}</strong> updated the phase specification',
      shouldBundle: true,
      bundledText: 'Phase specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: '<strong>{{userHandle}}</strong> updated the phase specification',
      shouldBundle: true,
      bundledText: 'Phase specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.progressModified',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: '<strong>{{userHandle}}</strong> updated the project progress',
      shouldBundle: true,
      bundledText: 'Project progress has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PROJECT_PLAN
    }, {
      text: '<strong>{{userHandle}}</strong> updated the project progress',
      shouldBundle: true,
      bundledText: 'Project progress has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PROJECT_PLAN
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.timelineModified',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: '<strong>{{userHandle}}</strong> updated the phase timeline',
      shouldBundle: true,
      bundledText: 'Phase timeline has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: '<strong>{{userHandle}}</strong> updated the phase timeline',
      shouldBundle: true,
      bundledText: 'Phase timeline has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.milestone.transition.active',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Milestone is activated in the phase',
      shouldBundle: true,
      bundledText: 'Milestones activated {{bundledCount}} times. Last activated by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: '<strong>{{userHandle}}</strong> activated a milestone in the phase',
      shouldBundle: true,
      bundledText: 'Milestones activated {{bundledCount}} times. Last activated by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.milestone.transition.completed',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'Milestone is completed in the phase',
      shouldBundle: true,
      bundledText: 'Milestones completed {{bundledCount}} times. Last completed by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: '<strong>{{userHandle}}</strong> completed a milestone in the phase',
      shouldBundle: true,
      bundledText: 'Milestones completed {{bundledCount}} times. Last completed by: <strong>{{userHandle}}</strong>',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  },
  {
    eventType: 'notifications.connect.project.phase.milestone.waiting.customer',
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [{
      text: 'We are waiting for your input in the project {{projectName}}',
      projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
      goTo: GOTO.PHASE
    }, {
      text: 'Waiting for customer on a milestone in the project {{projectName}}',
      projectRoles: [PROJECT_ROLE_COPILOT, PROJECT_ROLE_MANAGER],
      goTo: GOTO.PHASE
    }]
  }
]

// create a flat list of all possible notifications (expand notification rules)
export const NOTIFICATION_RULES = (() => {
  const notificationRules = []

  NOTIFICATIONS.forEach((notification) => {
    notification.rules.forEach((notificationRule) => {
      notificationRules.push({ ...notification, ...notificationRule })
    })
  })

  return notificationRules
})()
